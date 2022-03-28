import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Episode from './../Episode';

const testEpisode = {
    id:"xyz",
    image: null,
    name: "Chapter",
    season: 1,
    number: 1,
    summary: "this is an episode",
    runtime: "40 minutes"
}

test("renders without error", () => { 
    render(<Episode 
    episode= {testEpisode}/>)
});

test("renders the summary test passed as prop", () => {
    render(<Episode 
        episode={testEpisode}/>)
    const summary = screen.queryByText(/this is an episode/i)
    expect(summary).toBeInTheDocument()
     expect(summary).toBeTruthy()
    expect(summary).toHaveTextContent("this is an episode")
 });

test("renders default image when image is not defined", () => {
    render(<Episode episode={testEpisode}/>)
    const image = screen.queryByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png')
    expect(image).toBeInTheDocument
});
