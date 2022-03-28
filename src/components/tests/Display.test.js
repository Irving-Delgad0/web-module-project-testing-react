import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import mockFetchShow from "../../api/fetchShow"
jest.mock("../../api/fetchShow")

const testShow = {
    name: "Stranger Things",
    summary: "This is stranger things",
    seasons: [{
        id: 1,
        name: "season 1",
        episodes: []
    },
    {id: 2,
    name: "season 1",
    episodes: []
    }]
}


test('renders without errors with no props', async () => {
    render(<Display />)
 });

test('renders Show component when the button is clicked ', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow)
    render(<Display/>)
    const button = screen.getByRole('button')
    fireEvent.click(button)

    const show = await screen.findByTestId("show-container")
    expect(show).toBeInTheDocument
 });

test('renders show season options matching your data when the button is clicked', async () => { 
    mockFetchShow.mockResolvedValueOnce(testShow);

    render(<Display />)
    const button = screen.getByRole("button")
    fireEvent.click(button)

    const seasonOptions = await screen.findAllByTestId("season-option")
        expect(seasonOptions).toHaveLength(2)
});

test("Test that displayFunc is called when the fetch button is pressed", async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);
    const displayFunc = jest.fn()
    render(<Display displayFunc={displayFunc}/>)
    const button = screen.getByRole("button")
    fireEvent.click(button)
    
    expect(displayFunc).toHaveBeenCalled()  
    })

