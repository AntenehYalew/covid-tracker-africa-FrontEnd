import React, { Component } from 'react'
import "./footer.css"

class Footer extends Component {
    render () {
        const year = (new Date()).getFullYear()
        return (
            <div>
                <footer class="footer">
                    <div class="container">
                        <div class="row">
                            <div class="col" >
                                <p class="d-flex justify-content-end">&copy; <strong>APP</strong>esha || {year}</p>
                            </div>
                            <div class="col right-footer">
                                <p class="d-flex justify-content-start">Automating Daily Routines</p>
                            </div>

                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Footer