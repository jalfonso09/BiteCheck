import { useState, useRef } from "react";
import { Container, Form, ListGroup } from "react-bootstrap";
import debounce from "lodash.debounce";

interface CalorieCheckProps {
    apiKey: string;
    onSelectFood: (food: any) => void; 
}

const CalorieCheck: React.FC<CalorieCheckProps> = ({ apiKey, onSelectFood }) => {
    const [query, setQuery] = useState<string>("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchCount, setSearchCount] = useState<number>(0); 
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false); 

    const cacheRef = useRef<Map<string, any>>(new Map()); 
    const controllerRef = useRef<AbortController | null>(null); 
    
    const MAX_SEARCHES = 10; 

    
    const fetchSuggestions = async (searchString: string) => {
        if (!searchString || searchString.length < 3) {
            setSuggestions([]);
            setError(null);
            setShowSuggestions(false);
            return;
        }

        if (searchCount >= MAX_SEARCHES) {
            setError("Search limit reached. Please try again later.");
            return;
        }

        if (cacheRef.current.has(searchString)) {
            setSuggestions(cacheRef.current.get(searchString));
            setShowSuggestions(true);
            return;
        }

        setLoading(true);
        setError(null);

        if (controllerRef.current) {
            controllerRef.current.abort(); 
        }

        controllerRef.current = new AbortController();

        try {
            const response = await fetch(
                `https://api.nal.usda.gov/fdc/v1/foods/search?query=${searchString}&dataType=Foundation,SR%20Legacy&pageSize=5&api_key=${apiKey}`,
                { signal: controllerRef.current.signal }
            );

            const data = await response.json();
            setSuggestions(data.foods || []);
            cacheRef.current.set(searchString, data.foods || []);
            setSearchCount((prev) => prev + 1); 
            setShowSuggestions(true);
        } catch (error) {
            if (error instanceof Error && error.name !== "AbortError") {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    // Debounce API calls to prevent excessive requests
    const debouncedFetch = useRef(
        debounce((searchString: string) => fetchSuggestions(searchString), 500)
    ).current;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (searchCount < MAX_SEARCHES) {
            debouncedFetch(value);
        }
    };

    // Handle user selecting a food item
    const handleSelectFood = (food: any) => {
        setQuery(food.description); 
        onSelectFood(food); 
        setShowSuggestions(false);
    };

    return (
        <div className="pt-5 text-center pb-5 m-auto" style={{
            backgroundImage: "url('/background_Search.svg')",
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
            maxWidth: "650px",
            minHeight: "300px",
        }}>
            <p className="fs-5 fw-semibold" style={{ color: "#313030",backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
                Check your food's calorie content here!
            </p>
            <Container className="mt-3 bg-light" style={{ position: "relative", maxWidth: "500px" }}>
                <Form.Group controlId="foodSearchInput">
                    <Form.Control
                        style={{ borderColor: "#019689" }}
                        type="text"
                        autoComplete="off"
                        value={query}
                        className="rounded-pill border-3 px-4 py-2 fs-6"
                        placeholder="Search here..."
                        onChange={handleInputChange}
                        disabled={searchCount >= MAX_SEARCHES} 
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} 
                    />
                </Form.Group>
                {loading && <p className="text-muted">Loading...</p>}
                {error && <p className="text-danger">{error}</p>}

                {!error && showSuggestions && suggestions.length > 0 && (
                    <div
                        className="position-absolute bg-white shadow rounded"
                        style={{ width: "100%", zIndex: 1000 }}
                    >
                        <ListGroup>
                            {suggestions.map((food) => (
                                <ListGroup.Item
                                    key={food.fdcId}
                                    action
                                    onClick={() => handleSelectFood(food)}
                                    className="list-group-item-action"
                                    style={{ cursor: "pointer" }}
                                >
                                    {food.description}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                )}

                {query.length >= 3 && suggestions.length === 0 && !loading && !error && (
                    <p className="text-muted pt-3">
                        No results found, check the spelling or try a different keyword.
                    </p>
                )}

                {searchCount >= MAX_SEARCHES && (
                    <p className="pt-3">
                        Search limit reached. Get our App today so you can track your calories better!
                    </p>
                )}
            </Container>
        </div>
    );
};

export default CalorieCheck;
