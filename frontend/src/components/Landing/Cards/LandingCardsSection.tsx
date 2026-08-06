import { Stack, } from "@mui/material";
import {LandingCards} from "./LandingCards";

const cardData = [
    { 
        title: "Eco-Routing Engine", 
        description: "Lightweight API routes each request to whichever region currently has the lower carbon intensity score."
    },
    { 
        title: "Live Status Dashboard", 
        description: "Interactive map with region markers, expandable cards, and real-time routing status at a glance."
    },
    { 
        title: "Carbon Savings Tally", 
        description: "Running counter of emissions saved every time traffic lands on the cleaner region."
    },
    { 
        title: "Containerized Demo", 
        description: "Frontend, backend, and dummy regional servers run via Docker Compose on a single cloud VM."
    },
]

export const LandingCardsSection = () => {

    return (
        <Stack sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            flexWrap: 'wrap',
            gap: '32px',
        }}
        >
            {cardData.map((card, index) => (
                <LandingCards key={index} title={card.title} subtitle={card.description} />
            ))}
        </Stack>
    );
}