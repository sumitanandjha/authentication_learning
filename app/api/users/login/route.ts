import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/databse/dbConnection";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    await connect();
    try {
        const { email, password } = await req.json(); // Assuming body is an object with email and password fields
        const user = await User.findOne({ email });
        
        if (!user) {
            return NextResponse.json({ message: "User does not exist" }, { status: 400 });
        }

        const isPasswordMatch = await bcryptjs.compare(password, user.password);
        
        if (!isPasswordMatch) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const res = NextResponse.json({ message: `Welcome back ${user.username}` }, { status: 200 });
        
        // Set cookie with the token
        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // ensure cookies are only sent over HTTPS in production
            maxAge: 60 * 60 * 24, // 1 day
            path: "/", // cookie is available throughout the entire domain
        });

        return res;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
