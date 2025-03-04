# Omics Data Retrieval and Analysis System

A full-stack application for retrieving, analyzing, and visualizing gene expression data.

## Overview

This system allows users to:

1. Query and retrieve gene expression data for specific genes
2. Perform statistical analysis on gene expression across samples
3. Visualize expression data through interactive charts
4. Detect anomalies in gene expression patterns

## Tech Stack

### Backend
- **Node.js & Express**: For RESTful API development
- **MongoDB**: For storing gene expression data
- **Mongoose**: ODM for MongoDB
- **Docker**: For containerization

### Frontend
- **React**: UI library for building the user interface
- **Axios**: For API requests
- **Chart.js/D3.js**: For data visualization
- **React Bootstrap/Material UI**: For UI components

## System Architecture

```
┌────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                │     │                 │     │                 │
│  React         │     │  Node.js        │     │  MongoDB        │
│  Frontend      │◄────┤  Backend        │◄────┤  Database       │
│                │     │                 │     │                 │
└────────────────┘     └─────────────────┘     └─────────────────┘
```

## Features

### Backend API Endpoints

1. **Data Retrieval Endpoint**:
   - `GET /api/genes`: Get all available genes
   - `POST /api/genes/query`: Query expression data for specified genes
   - Parameters: List of gene IDs
   - Returns: Expression data for requested genes

2. **Data Analysis Endpoint**:
   - `GET /api/analysis/gene/:geneId`: Get statistical analysis for a gene
   - Returns: Mean, median, variance across samples

3. **Anomaly Detection Endpoint**:
   - `GET /api/analysis/outliers/gene/:geneId`: Detect outliers in expression data
   - Returns: Identified outliers with confidence scores

### Frontend Components

1. **Gene Selection Interface**:
   - Search/select fields for gene IDs
   - Submit button to fetch expression data

2. **Data Display**:
   - Tabular view of expression data
   - Analysis buttons for each gene

3. **Visualization Components**:
   - Line/bar charts for expression values across samples
   - Heatmap visualization for comparative analysis
   - Outlier highlighting in visualizations

## Database Schema

### Gene Collection
```
{
  geneId: String,
  transcript: String,
  expressionValues: {
    exper_rep1: Number,
    exper_rep2: Number,
    exper_rep3: Number,
    control_rep1: Number,
    control_rep2: Number,
    control_rep3: Number
  }
}
```

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js (for local development)
- npm or yarn (for local development)

### Installation & Running with Docker

1. Clone the repository:
```bash
git clone https://github.com/emredemirhan/omics-data-analysis.git
cd omics-data-analysis
```

2. Run with Docker Compose:
```bash
docker-compose up
```

This will:
- Start the MongoDB database
- Start the Node.js backend on http://x.xyz.com
- Start the React frontend on http://y.xyz.com

### Manual Setup (Development)

#### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file with:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/omics
FRONTEND_URL=http://localhost:3000
```

4. Seed the database with mock data:
```bash
npm run seed
```

5. Start the development server:
```bash
npm run dev
```

#### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file with:
```
REACT_APP_API_URL=http://localhost:3001/api
```

4. Start the development server:
```bash
npm start
```

## Project Structure

```
.
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│   │   ├── index.js
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   └── utils/
│   └── data/
│       └── mockData.csv
└── frontend/
    ├── Dockerfile
    ├── package.json
    ├── public/
    └── src/
        ├── components/
        ├── pages/
        ├── services/
        ├── utils/
        └── App.js
```