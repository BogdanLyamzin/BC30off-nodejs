// const fs = require("fs");
const fs = require("fs/promises");
// const fs = require("fs").promises;

const fileOperation = async() => {
    try {
        // const text = await fs.readFile("./files/file.txt", "utf-8");
        // console.log(text);
        // const data = await fs.readFile("./files/file.txt");
        // const text = data.toString();
        // console.log(text);
        // await fs.appendFile("./files/file.txt", "\nТак говорил Заратустра");
        // await fs.writeFile("./files/file.txt", "Винни-Пух и Пятак");
        // await fs.appendFile("./files/file2.txt", "Так говорил Заратустра");
        // await fs.writeFile("./files/file3.txt", "Винни-Пух и Пятак");
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

fileOperation()

// fs.readFile("./files/file.txt")
//     .then(data => console.log(data))
//     .catch(error => console.log(error.message));

// fs.readFile("./files/file.txt", (error, data)=>{
//     console.log(error);
//     console.log(data);
//     const text = data.toString();
//     const newData = text.split(" ");
//     newData.splice(-1);
//     const nextText = newData.join(" ");
//     fs.writeFile("./files/file.txt", (error, data)=> {

//     })
// })