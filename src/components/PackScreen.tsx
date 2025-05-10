import { useEffect, useState, useContext } from 'react';
import { MenuPokedexContext, EPokedexScreen } from '../contexts/MenuPokedexContext';
import axios from 'axios';
import './PackScreen.css';

interface Item {
  id: number;
  name: string;
  sprite: string;
  description: string;
}

export const PackScreen = () => {
  const { setScreen, selectedItemIndex, setSelectedItemIndex } = useContext(MenuPokedexContext);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://pokeapi.co/api/v2/item?limit=50');
        const itemData = await Promise.all(
          response.data.results.map(async (item: { name: string; url: string }, index: number) => {
            const itemDetails = await axios.get(item.url);
            let description = itemDetails.data.effect_entries[0]?.effect || 'No description available';
            // Truncate description to ~120 characters to fit screen
            description = description.length > 120 ? description.slice(0, 117) + '...' : description;
            return {
              id: index + 1,
              name: item.name,
              sprite: itemDetails.data.sprites.default || '',
              description,
            };
          })
        );
        setItems(itemData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching items:', error);
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) {
    return <div className="font-pokemon text-center">Loading Items...</div>;
  }

  const item = items[selectedItemIndex];

  return (
    <div className="pack-screen font-pokemon text-xs">
      <div className="item-list">
        <ul>
          {items.map((item, index) => (
            <li
              key={item.id}
              className={`item ${index === selectedItemIndex ? 'selected' : ''}`}
            >
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </li>
          ))}
        </ul>
      </div>
      {item && (
        <div className="item-details">
          {item.sprite && <img src={item.sprite} alt={item.name} className="item-image" />}
          <h2>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h2>
          <p>{item.description}</p>
        </div>
      )}
    </div>
  );
};