# LuxuryCars

LuxuryCars is an ecommerce site developed using React. It is a dealership shop that advertises luxury cars, and the list of cars can be filtered down by three categories. A user will need authentication to be able to access some parts of the site.

For placement of order on any car of interest by the user, they will enter their details (the details should not have to be real as this is a development site).

Firebase is used to manage the backend and authentication.

Warning: Vite enforces using jsx syntax inside jsx/tsx files, so it will complain about that. Solution: rename `.js` files to `.jsx` :)

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [Development](#development)
- [Contributing](#acknowledgment)

## Getting Started

To get a local copy up and running follow these simple steps:

1. Clone the repository
   ```sh
   git clone https://github.com/AbramKanime/luxurycars.git

2. Navigate to the project directory
   ```sh
   cd luxurycars

3. Install dependencies
   ```sh
   npm install

4. Start the development server
   ```sh
   npm run start

Your project should now be running at http://localhost:5173/.


## Prerequisites

- Node.js
- npm



## Usage
The index.jsx file houses the App component. The App component uses BrowserRouter and Routes {which must first be imported from react-router-dom} to render the pages/components. Below is a snippet of how it was done.

```markdown
### Usage

```jsx
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route element={<AuthRequired />}>
            <Route path="orders" element={<User />} />
          </Route>
          <Route path="account" element={<AccountLayout />}>
            <Route index element={<Login />} />
            <Route path="signup" element={<CreateAccount />} />
          </Route>
          <Route path="cars" element={<Cars />} />
          <Route element={<AuthRequired />}>
            <Route path="cars/:id" element={<CarDetail />}>
              <Route index element={<CarInfo />} />
              <Route path="photos" element={<CarPhoto />} />
            </Route>
          </Route>
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)

## Development

To contribute to this project, follow these steps:

1. Fork the repository
2. Create a new branch
   ```
   git checkout -b feature/your-feature
3. Make your changes
4. Commit your changes
   ```sh
   git commit -m 'Add some feature'
5. Push to the branch
   ```
   git push origin feature/your-feature
6. Open a pull request

## Acknowledgments

- A special thanks to Scrimba for using some styling from them

## Author
#### Abraham Kanime
