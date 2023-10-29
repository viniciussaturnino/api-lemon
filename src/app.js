import express from "express";

const app = express();

app.get("/test", (request, response) => {
    return response.json({
        message: "Teste"
    });
})

app.listen(3000, () => console.log(`App is running on ${process.env.PORT || 3000}`));
