import { Container, Card } from "react-bootstrap";

interface FoodItem {
  fdcId: number;
  description: string;
  foodNutrients: { nutrientName: string; value: number; unitName: string }[];
  [key: string]: any; 
}

interface SearchResultProps {
  selectedFood: FoodItem | null;
}

const SearchResult: React.FC<SearchResultProps> = ({ selectedFood }) => {
  if (!selectedFood) {
    return (
      <div className="p-3 pb-5" style={{background: "#019689"}}>
      </div>
    );
      
  }

  // Extract specific nutrient values
  const getNutrientValue = (nutrientName: string) => {
    const nutrient = selectedFood.foodNutrients.find(n => n.nutrientName === nutrientName);
    return nutrient ? `${nutrient.value} ${nutrient.unitName}` : "N/A";
  };
  
  return (
    <div className="p-3 pb-5" style={{background: "#019689"}}>
      <Container className="mt-4 d-flex flex-wrap justify-content-center gap-3" style={{ maxWidth: "900px" }}>
      <h2 className="w-100 text-center text-white">{selectedFood.description}</h2>

      <Card className="p-3 text-center shadow-sm flex-grow-1" style={{ minWidth: "150px", maxWidth: "200px" }}>
        <Card.Title className="fs-5">Calories</Card.Title>
        <Card.Text className="fw-bold">{getNutrientValue("Energy")}</Card.Text>
      </Card>

      <Card className="p-3 text-center shadow-sm flex-grow-1" style={{ minWidth: "150px", maxWidth: "200px" }}>
        <Card.Title className="fs-5">Protein</Card.Title>
        <Card.Text className="fw-bold">{getNutrientValue("Protein")}</Card.Text>
      </Card>

      <Card className="p-3 text-center shadow-sm flex-grow-1" style={{ minWidth: "150px", maxWidth: "200px" }}>
        <Card.Title className="fs-5">Carbohydrates</Card.Title>
        <Card.Text className="fw-bold">{getNutrientValue("Carbohydrate, by difference")}</Card.Text>
      </Card>

      <Card className="p-3 text-center shadow-sm flex-grow-1" style={{ minWidth: "150px", maxWidth: "200px" }}>
        <Card.Title className="fs-5">Fat</Card.Title>
        <Card.Text className="fw-bold">{getNutrientValue("Total lipid (fat)")}</Card.Text>
      </Card>

    </Container>
    </div>
  );
  
};

export default SearchResult;
