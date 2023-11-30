import React from "react";

const List = ({items, removeItem, editItem}) => {
    return(
        <div>
            {items.map((item) => {
                const {id, title} = item; 
                return(
                    <article key={id} className='grocery-item'>
                        <p className="title">{title}</p>
                        <div className="btn-container">
                            <button className="edit-btn" type="button" onClick={() => editItem(id)}>
                                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                                <i class="fa fa-pencil-square-o" style={{fontSize: "15px"}} aria-hidden="true"></i>
                            </button>
                            <button className="delete-btn" type="button" onClick={() =>  removeItem(id)}>
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                                <i class="fa fa-trash-o" style={{fontSize: "15px"}} aria-hidden="true"></i>
                            </button>
                        </div>
                    </article>
                )
            })}
        </div>
    )
};

export default List;
