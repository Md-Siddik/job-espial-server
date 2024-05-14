const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mmuv9dp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const jobCollection = client.db('JobEspial').collection('allJobs');
    // const appliedCollection = client.db('JobEspial').collection('appliedJobs');

    // app.get('/findJobs', async (req, res) => {
    //     const cursor = jobCollection.find();
    //     const result = await cursor.toArray();
    //     res.send(result);
    //   })

    app.get('/allJobs', async (req, res) => {
      const cursor = jobCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/allJobs/:id', async (req, res) => {
      const id = req.params.id;
      const filter = {_id:new ObjectId(id)}
      const result = await jobCollection.findOne(filter)
      res.send(result);
    })

    app.post('/allJobs', async (req, res) => {
      const newJob = req.body;
      console.log(newJob);
      const result = await jobCollection.insertOne(newJob);
      res.send(result);
    })


    app.put('/allJobs/:id', async(req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const updatedItem = req.body;
      const item = {
        $set: {
          picture: updatedItem.picture,
          job_title: updatedItem.job_title,
          job_category: updatedItem.job_category,
          salary_range: updatedItem.salary_range,
          job_description: updatedItem.job_description,
          post_date: updatedItem.post_date,
          application_deadline: updatedItem.application_deadline,
          applicants_number: updatedItem.applicants_number
        }
      }
      
      const result = await jobCollection.updateOne(filter, item, options);
      res.send(result);
    })

    app.patch('/allJobs/:id', async(req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const updatedItem = req.body;
      const item = {
        $set: {
          picture: updatedItem.picture,
          job_title: updatedItem.job_title,
          job_category: updatedItem.job_category,
          salary_range: updatedItem.salary_range,
          job_description: updatedItem.job_description,
          post_date: updatedItem.post_date,
          application_deadline: updatedItem.application_deadline,
          applicants_number: updatedItem.applicants_number,
          user_name: updatedItem.user_name,
          user_email: updatedItem.user_email,
          resume_link: updatedItem.resume_link
        }
      }
      
      const result = await jobCollection.updateOne(filter, item, options);
      res.send(result);
    })

    // app.post('/appliedJobs', async (req, res) => {
    //   const newJob = req.body;
    //   console.log(newJob);
    //   const result = await appliedCollection.insertOne(newJob);
    //   res.send(result);
    // })

    // app.put('/appliedJobs/:id', async(req, res) => {
    //   const id = req.params.id;
    //   const filter = { _id: new ObjectId(id) }
    //   const options = { upsert: true };
    //   const updatedItem = req.body;
    //   const item = {
    //     $set: {
    //       picture: updatedItem.picture,
    //       job_title: updatedItem.job_title,
    //       job_category: updatedItem.job_category,
    //       salary_range: updatedItem.salary_range,
    //       job_description: updatedItem.job_description,
    //       post_date: updatedItem.post_date,
    //       application_deadline: updatedItem.application_deadline,
    //       applicants_number: updatedItem.applicants_number,
    //       resume_link: updatedItem.resume_link
    //     }
    //   }
      
    //   const result = await appliedCollection.updateOne(filter, item, options);
    //   res.send(result);
    // })

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('job is espiling')
})

app.listen(port, () => {
    console.log(`Job-Espial server is running on port ${port}`)
})