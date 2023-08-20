import { Mongoose } from "mongoose";
import Hotel from '../models/Hotel.js';


//create hotel
export const createHotel=async (req, res,next) => {

    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json("Added successfully")
    } catch (error) {
        next(err)
    }
}


//update hotel for id
export const updateHotel=async (req, res,next) => {

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,
            { $set: req.body }, { new: true });
        res.status(200).json("Updated successfully")
    } catch (error) {
        next(err)
    }
}


//delete hotel id
export const deleteHotel=async (req, res,next) => {

    try {
      await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("hotel will deleted ")
    } catch (error) {
        next(error)
    }
}

//get  hotel
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        // Corrected usage

        if (!hotel) {
            return next(createError(404, "Hotel not found"));
        }

        res.status(200).json(hotel);
    } catch (error) {
        next(error);
    }
}



//all hotels
export const getHotels = async (req,res,next)=>{
    //  const {min,max, ...others}=req.query;
    try {
        const hotels =await Hotel.find({
        // ...others,
        // cheapestPrice: {$gt : min | 1, $lt: max || 9999},   
           
        }).limit(req.query.limit);
        res.status(200).json(hotels);
    } catch (error) {
        next(error)
    }
}

  


// //all hotels countbycity
// //all hotels countbycity
// export const countByCity = async (req, res, next) => {
//     try {
//         if (!req.query.cities) {
//             return res.status(400).json("Missing 'cities' parameter");
//         }
        
//         const cities = req.query.cities.split(",");
//         const list = await Promise.all(cities.map(city => {
//             return Hotel.countDocuments({ city: city });
//         }));
//         res.status(200).json(list);
//     } catch (error) {
//         next(error);
//     }
// }


export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });

        const countsByType = [
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: villaCount },
            { type: "cabin", count: cabinCount }
        ];

        res.status(200).json(countsByType);
    } catch (error) {
        
        next(error);
    }
};

//all hotels
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
   
    try {
        const list = await Promise.all(cities.map(async city => {
            const count = await Hotel.countDocuments({ city: city });
            return count;
        }));
        
        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
};

// export const countByType = async (req, res, next) => {
//     try{
//    const hotelCount = await Hotel.countDocuments({type:"hotel"});
//    const apartmentCount =await Hotel.countDocuments({type:"apartment"});
//    const resortCount =await Hotel.countDocuments({type:"resort"});
//    const villaCount =await Hotel.countDocuments({type:"villa"});
//    const cabinCount =await Hotel.countDocuments({type:"cabin"});
   
        
//         res.status(200).json([
//             {type: "hotel",count:hotelCount},
//             {type: "apartments",count:apartmentCount},
//             {type: "resorts",count:resortCount},
//             {type: "villas",count:villaCount},
//             {type: "cabins",count:cabinCount}
//         ]);
//     } catch (error) {
//         next(error);
//     }

// };
