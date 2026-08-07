import { useCallback, useEffect, useState, } from "react";
import { Box, Stack, } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";

import { LandingCards } from "./LandingCards";

import { BrandColors, } from "../../../assets/themes/colors";

interface CardData {
    title: string;
    description: string;
}

interface LandingCardsCarouselProps {
    cardData: CardData[];
}

export const LandingCardsCarousel = ({ cardData }: LandingCardsCarouselProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true },
    );
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    useEffect(() => {
        if (!emblaApi) return;
        const interval = setInterval(() => {
            if(emblaApi.canScrollNext()) {
                emblaApi.scrollNext();
            } else {
                emblaApi.scrollTo(0);
            }
        }, 4000);
        return () => clearInterval(interval);
    }, [emblaApi]);

    return(
            <Stack sx={{ width: '100%', alignItems: 'center', gap: '16px' }}>
            <Box ref={emblaRef} sx={{ overflow: 'clip', width: '100%' }}>
                <Box sx={{ display: 'flex', paddingY: '8px' }}>
                    {cardData.map((card, index) => (
                        <Box
                            key={index}
                            sx={{
                                flex: { xs: '0 0 100%', md: '0 0 80%', },
                                minWidth: 0,
                                paddingX: {xs: '8px', md: '160px'},
                                textAlign: {xs: 'center', md: 'left', lg: 'center'},
                            }}
                        >
                            <LandingCards title={card.title} subtitle={card.description} />
                        </Box>
                    ))}
                </Box>
            </Box>
            <Stack direction="row" sx={{ gap: '8px' }}>
                {cardData.map((_, index) => (
                    <Box
                        key={index}
                        onClick={() => emblaApi?.scrollTo(index)}
                        sx={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            backgroundColor: selectedIndex === index ? BrandColors.MainPrimary : 'grey.400',
                            transition: 'background-color 0.2s ease',
                        }}
                    />
                ))}
            </Stack>
        </Stack>
    );
};