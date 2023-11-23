import { render } from '@testing-library/react';
import React from 'react';
import App from './App';
import '@testing-library/jest-dom';

global.matchMedia = global.matchMedia || function () {
    return {
        addListener: jest.fn(),
        removeListener: jest.fn(),
    };
};

describe('App', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });
    it('should render successfully', () => {
        const { baseElement } = render(<App />);
        expect(baseElement).toBeTruthy();
    });
    it('should render layout', () => {
        const { getByTestId } = render(<App />);
        expect(getByTestId('layout')).toBeInTheDocument();
    });
    it('should render header', () => {
        const { getByTestId } = render(<App />);
        expect(getByTestId('header')).toBeInTheDocument();
    });
    it('should render logo', () => {
        const { getByTestId } = render(<App />);
        expect(getByTestId('logo')).toBeInTheDocument();
    });
    it('should render content', () => {
        const { getByTestId } = render(<App />);
        expect(getByTestId('content')).toBeInTheDocument();
    });
    it('should render footer', () => {
        const { getByTestId } = render(<App />);
        expect(getByTestId('footer')).toBeInTheDocument();
    });
    it('should render exchange table', () => {
        const { getByTestId } = render(<App />);
        expect(getByTestId('exchange-table')).toBeInTheDocument();
    });
    it('should render currency converter', () => {
        const { getByTestId } = render(<App />);
        expect(getByTestId('currency-converter')).toBeInTheDocument();
    });
});
