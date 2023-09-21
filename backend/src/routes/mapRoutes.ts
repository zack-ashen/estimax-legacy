import express from 'express';
import { LRUCache } from 'lru-cache'
import { locationAutocomplete } from '../util/maps';

const router = express.Router();

const locationCache = new LRUCache<string, any>({
    max: 2000,  // max number of items
    ttl: 1209600000  // items expire after 2 weeks
  });
  
router.route('/searchLocation').get(async (req, res) => {
    try {
        const search = req.query.search as string;
        const type = req.query.type as string;

        if (!search) {
            return res.json({ locations: [] });
        }

        const locCache = type === 'cities' ? locationCache.get(search) : undefined;
        if (locCache) {
            return res.json({ locations: locCache });
        }

        const locData = await locationAutocomplete(type, search);
        
        type === 'cities' && locationCache.set(search, locData.predictions);
        
        res.json({ locations: locData.predictions.slice(0,6) });
    } catch (error) {
        res.status(500).send({ error: 'Error searching for location' } );
    }
})


export default router;