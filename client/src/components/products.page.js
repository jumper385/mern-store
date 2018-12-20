import React, { Component } from 'react'
import { connect } from 'react-redux'
import StackGrid from "react-stack-grid";

class Products extends Component {

    render() {   
        const products = this.props.products
        const catalogue = products ? (
            products.map(product => {
                return (
                
                    <div className="card" key={product._id}>
                        <img src="https://via.placeholder.com/300" alt='{}' className="card-img-top"/>
                        <div className="card-body">
                            <h5 className="card-title">{product.name} ${product.price}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{product.description}</h6>
                            <a href="#" className="card-link">More Details</a>
                            <a href="#" style={{'margin':'16pt'}} className="btn btn-primary">Add to Cart</a>
                        </div>
                    </div>
                
                )
            })
        ) : (
            <p>problem loading...</p>
        )

        return (
            <div className="container">
                <StackGrid style={{'margin-top':'72pt'}} columnWidth={"33.333%"} gutterWidth={30} gutterHeight={30}>
                    {catalogue}
                </StackGrid>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.GetProducts.products
    }
}

const mapDispatchToProps = dispatch => ({
    getProducts: (payload) => dispatch({ type: 'GET_ALL_PRODUCTS', payload: payload })
})


export default connect(mapStateToProps, mapDispatchToProps)(Products)