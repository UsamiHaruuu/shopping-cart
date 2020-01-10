import React,{useState, useEffect} from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("./data/products.json");
      if(!response.ok)return;
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);
  return (
    <ul>
      {products.map(product =>
        <li key={product.sku}>
          {product.title}
        </li>
      )}
    </ul>
  )
}

export default App;
