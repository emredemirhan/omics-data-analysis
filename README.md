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

For Docker deployment:
- Docker and Docker Compose

For local development:
- Node.js and npm/yarn
- MongoDB Community Edition

### Installation Options

#### Option 1: Using Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/emredemirhan/omics-data-analysis.git
cd omics-data-analysis
```

2. Run with Docker Compose:
```bash
# For modern Docker installations
docker compose up

# OR for legacy Docker installations
docker-compose up
```

This will:
- Start the MongoDB database
- Start the Node.js backend on http://x.xyz.com
- Start the React frontend on http://y.xyz.com

#### Option 2: Manual Setup (Development)

1. **Set up MongoDB**:
   - For macOS (using Homebrew):
     ```bash
     brew tap mongodb/brew
     brew install mongodb-community
     brew services start mongodb-community
     ```
   - For Windows/Linux, follow the [MongoDB Installation Guide](https://docs.mongodb.com/manual/administration/install-community/)
   - Verify MongoDB is running:
     ```bash
     mongosh
     ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file with:
   ```
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/omics
   ```
   
   Seed the database and start the server:
   ```bash
   npm run seed
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   ```
   
   Create a `.env` file with:
   ```
   REACT_APP_API_URL=http://localhost:3001/api
   ```
   
   Start the development server:
   ```bash
   npm start
   ```

### Environment Configuration

The application uses environment variables for configuration:

1. **Local Development Environment**:
   - Located in `.env` files in both frontend and backend directories
   - Used when running the application locally without Docker

2. **Docker Production Environment**:
   - Defined in the `docker-compose.yml` file
   - Used when running the application with Docker Compose

#### Production Deployment

For production deployment, the application is configured to run:
- Backend API at `http://x.xyz.com`
- Frontend at `http://y.xyz.com`

To modify these URLs, update the environment variables in the `docker-compose.yml` file:
```yaml
# Frontend environment
- REACT_APP_API_URL=http://x.xyz.com/api
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