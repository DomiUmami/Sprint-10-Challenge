import React, { useState } from 'react';
import { useGetHistoryQuery } from '../state/pizzaApi';

export default function OrderList() {
  const { data: orders, isLoading } = useGetHistoryQuery();
  const [activeFilter, setActiveFilter] = useState('All');

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(orders)

  const filteredOrders = activeFilter === 'All' ? orders : orders.filter(order => order.size === activeFilter);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {filteredOrders.map((order, index) => {
          console.log(order.size)
          return (<li key={index}>
            <div>
            {order.customer} ordered a size {order.size} with {order.toppings ? (order.toppings.length > 0 ? `${order.toppings.length} topping${order.toppings.length !== 1 ? 's' : ''}` : 'no toppings') : 'no toppings'}
            </div>
          </li>)
        })}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {['All', 'S', 'M', 'L'].map(size => {
          console.log(size)
          const className = `button-filter${size === activeFilter ? ' active' : ''}`;
          return (
            <button
              key={size}
              data-testid={`filterBtn${size}`}
              className={className}
              onClick={() => handleFilterClick(size)}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
