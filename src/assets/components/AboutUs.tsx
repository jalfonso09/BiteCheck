import { Button } from "react-bootstrap";

const AboutUs = () => {
    return (
        <div id="about" className="pt-5">
            <div 
                className="d-flex flex-column flex-md-row align-items-center justify-content-center text-center text-md-start" 
                style={{ minHeight: "300px", maxWidth: "900px", margin: "auto", padding: "20px" }}
            >
                
                <div className="p-4" style={{ maxWidth: "600px" }}>
                    <h1 className="fw-semibold">
                        Stay fit and healthy<br />
                        with <span className="fw-bold" style={{ color: "#019689" }}>BiteCheck.</span>
                    </h1>

                    <p className="fs-6 fs-md-5">
                        Welcome to BiteCheck, your ultimate fitness and health tracker!
                        Log your meals, track your workouts, and stay on top of your goals—all
                        in one place. Whether you're counting calories, hitting the gym,
                        or just staying active, BiteCheck helps you stay accountable.
                    </p>
                </div>

                
                <div 
                    className="p-4 w-100 w-md-auto d-flex flex-column align-items-center align-items-md-end" 
                    style={{ maxWidth: "600px" }}
                >
                    <Button 
                        style={{ 
                            backgroundColor: "#FE8F00", 
                            color: "white", 
                            border: "none", 
                            padding: "10px 20px", 
                            fontSize: "18px", 
                            fontWeight: "bold",
                            borderRadius: "5px",
                            transition: "background-color 0.3s ease"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#e87e00"}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#FE8F00"}
                    >
                        Join Now!
                    </Button>
                    
                    <p className="text-secondary mt-2" style={{fontSize:".8rem"}}>*Cancel anytime for free!</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
