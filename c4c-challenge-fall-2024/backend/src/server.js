import express from 'express';
import {createClient} from '@supabase/supabase-js'
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 4000;

const supabaseUrl = 'https://aprtaiyxddigczbrpxxl.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


// Parse request bodies as JSON
app.use(express.json())

// Enable CORS for the frontend so it can call the backend
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    next();
})

/*
  APPLICATION ROUTES
*/

// Called when the dashboard is loaded. Gets all the current partner
// organizations in the database.
app.get('/', async (req, res) => {
    try {
        const {data, error} = await supabase
            .from('PartnerOrganization')
            .select();

        if (error) {
            throw error;
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching partner organizations:', error.message);
        res.status(500).json({error: error.message});
    }
});

// Called when new partners are added to the database
app.post('/partners', async (req, res) => {
    try {
        const {name, description, logo, active} = req.body;

        const {data, error} = await supabase
            .from('PartnerOrganization')
            .insert([{name, description, logo, active}]);

        if (error) {
            throw error;
        }

        res.status(201).json({message: 'Partner organization added successfully!', data});
    } catch (error) {
        console.error('Error adding partner organization:', error.message);
        res.status(500).json({error: error.message});
    }
});

// Called when user wants to delete a partner from the database
app.delete('/partners/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const {data, error} = await supabase
            .from('PartnerOrganization')
            .delete()
            .eq('id', id);

        if (error) {
            throw error;
        }

        res.status(200).json({message: 'Partner organization deleted successfully!'});
    } catch (error) {
        console.error('Error deleting partner organization:', error.message);
        res.status(500).json({error: error.message});
    }
});


// Start the backend
app.listen(port, () => {
    console.log(`Express server starting on port ${port}!`);
})