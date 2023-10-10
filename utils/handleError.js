

const handleError = (error, res) => {
    console.log(error)
    let errorMessage = "Internal Server error";
    if (error.message) {
        errorMessage = error.message
    }
    res.status(500).json({ error: errorMessage })
}

module.exports = handleError