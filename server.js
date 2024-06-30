const express = require('express');
const app = express();


app.get('/api/data', (req, res) => {
    const data = [
        {
            id: "0",
            name: "Viral Video",
            date: "2024-02-16 00:00:15",
            status: "Complete",
          },
          {
            id: "1",
            name: "Figma Use",
            date: "2024-02-25 00:01:15",
            status: "Complete",
          },
          {
            id: "2",
            name: "Viral video 2",
            date: "2024-02-28 00:01:20",
            status: "Complete",
          },
          {
            id: "3",
            name: "Prank Video",
            date: "2024-03-02 00:00:15",
            status: "Failed",
          },
          {
            id: "4",
            name: "Shiva Ratri",
            date: "2024-03-08 00:01:15",
            status: "Complete",
          },
          {
            id: "5",
            name: "Viral Shiva Temple",
            date: "2024-03-06 00:01:15",
            status: "Processing",
          },
          {
            id: "6",
            name: "Shiva  Puja at Home",
            date: "2024-03-07 00:01:15",
            status: "Falieds",
          },
          {
            id: "7",
            name: "Figma Use part 2",
            date: "2024-03-26 00:01:15",
            status: "Complete",
          },
          {
            id: "8",
            name: "Figma Use",
            date: "2024-02-25 00:01:15",
            status: "Processing",
          },
          {
            id: "9",
            name: "Figma Use",
            date: "2024-02-25 00:01:15",
            status: "Complete",
          },
    ];
    res.json(data);
  });
  
//   const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// const express = require('express');
// const path = require('path');
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });
