import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useGetHistoryQuery } from '../state/pizzaApi'


export default function OrderList() {
  const { data: orders } = useGetHistoryQuery()
  
  const handleFilterClick = (evt) => {
    
  }

  
  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders?.map(order => {
            return (
              <li key={order.id}>
                <div>
                {order.customer} ordered a size {order.size} with {order.toppings ? (order.toppings.length > 0 ? `${order.toppings.length} topping${order.toppings.length !== 1 ? 's' : ''}` : 'no toppings') : 'no toppings'}
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === 'All' ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              onClick={() => handleFilterClick(size)}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
