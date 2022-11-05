import React from 'react'
import Pagination from "@material-ui/lab/Pagination/Pagination"
import { createTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core'

const theme = createTheme({
    palette: {
        type: "dark",
    }
})
const Paginations = ({
    page, setPage, countPages = 10
}) => {

    const handlePageChange = (page) => {
        setPage(page)
    }

    return (
        <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            alignItems: "center",
            paddingBottom: "50px"
        }}>
           <ThemeProvider theme={theme}>
           <Pagination
            count={countPages}
             onChange={(e) =>
              handlePageChange(e.target.textContent)}
              
               />
           </ThemeProvider>

        </div>
    )
}

export default Paginations
