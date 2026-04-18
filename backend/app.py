from fastapi import FastAPI, HTTPException
from typing import Dict
import yaml

app = FastAPI()

@app.post("/render-pdf")
async def render_pdf(data: Dict):
    """
    Endpoint to render a PDF. 
    The data parameter should contain the required information to generate a PDF.
    """
    # Placeholder for PDF rendering logic
    pdf_output = "PDF generated successfully with the provided data."
    return {"message": pdf_output}

@app.post("/validate-yaml")
async def validate_yaml(yaml_content: str):
    """
    Endpoint to validate the provided YAML content.
    """
    try:
        yaml.safe_load(yaml_content)
        return {"message": "YAML is valid."}
    except yaml.YAMLError as e:
        raise HTTPException(status_code=400, detail=f"YAML validation error: {str(e)}")

@app.get("/templates")
async def get_templates():
    """
    Endpoint to serve templates.
    """
    # Placeholder for fetching templates
    templates = ["template1.yaml", "template2.yaml"]
    return {"templates": templates}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)