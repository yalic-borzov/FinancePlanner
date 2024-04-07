from pydantic import BaseModel


class CategoryCreate(BaseModel):
    name: str


class CategorySchema(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True
