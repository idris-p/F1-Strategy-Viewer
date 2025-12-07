from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

strategy_df = pd.read_csv('f1_strategy_data.csv')
grand_prix_df = pd.read_csv('f1_grand_prix_data.csv')

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/strategies/{year}/{round}")
async def get_strategy(year: int, round: int):
    filtered_df = strategy_df[
        (strategy_df['year'] == year) & (strategy_df['round'] == round)
    ]
    return filtered_df.to_dict(orient='records')

@app.get("/api/grand_prix/{year}/{round}")
async def get_grand_prix_info(year: int, round: int):
    filtered_df = grand_prix_df[
        (grand_prix_df['year'] == year) & (grand_prix_df['round'] == round)
    ]
    if filtered_df.empty:
        return {"error": "Grand Prix not found"}
    
    return filtered_df.to_dict(orient='records')

@app.get("/api/race_result/{year}/{round}")
async def get_race_result(year: int, round: int):
    filtered_df = strategy_df[
        (strategy_df['year'] == year) & (strategy_df['round'] == round)
    ]
    if filtered_df.empty:
        return {"error": "Race results not found"}
    race_result = {filtered_df['driver']: filtered_df['finish_position'] for _, filtered_df in filtered_df.iterrows()}
    return {"race_result": race_result}

@app.get("/api/available_years")
async def get_available_years():
    years = grand_prix_df['year'].unique().tolist()
    return {"available_years": years}

@app.get("/api/available_rounds/{year}")
async def get_available_rounds(year: int):
    rounds = grand_prix_df[grand_prix_df['year'] == year].groupby('round')['grand_prix'].first().to_dict()
    return {"available_rounds": rounds}