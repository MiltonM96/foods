import React from 'react'
import Styles from './Paginate.module.css'

function Paginate({recipesPerPage, allRecipes, paginate}) {
    const pageNumbers = [];

    for(let i=1; i<=Math.ceil(allRecipes/recipesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={Styles.paginated}>
            <nav>
                <ul className="paginate">
                    { pageNumbers &&
                    pageNumbers.map(number => (
                        <li className='number' key={number}>
                            <button 
                            className={Styles.buttonNumber}
                            onClick={() => paginate(number)}
                            >
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Paginate