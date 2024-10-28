import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const uri = "mongodb://localhost:27017/";

export async function GET() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("Inventory");
        const inventory = database.collection("Inventory");

        // Fetch all products
        const allProducts = await inventory.find({}).toArray();
        return NextResponse.json(allProducts);
    } finally {
        await client.close();
    }
}

export async function POST(request) {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("Inventory");
        const inventory = database.collection("Inventory");

        // Parse the request body
        const body = await request.json();
        const result = await inventory.insertOne(body);

        return NextResponse.json({ product: { ...body, _id: result.insertedId }, ok: true });
    } catch (error) {
        console.error("Error adding product:", error);
        return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
    } finally {
        await client.close();
    }
}

// DELETE method
export async function DELETE(request) {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("Inventory");
        const inventory = database.collection("Inventory");

        // Parse the request body
        const { id } = await request.json();

        // Validate the input data
        if (!id) {
            return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
        }

        // Delete the product with the provided ID
        const result = await inventory.deleteOne({ _id: new ObjectId(id) });

        // Check if the product was found and deleted
        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        // Return success response
        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    } finally {
        await client.close();
    }
}
