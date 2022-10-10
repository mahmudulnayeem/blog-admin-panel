import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../lib/mongodb";
export default async function handler(
  request,
  response
) {
  const { database } = await connectToDatabase();
  const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);
  const id = new ObjectId(request.query.id);
  const results = await collection.find({ _id: id }).toArray();

  response.status(200).json(results);
}
