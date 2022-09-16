import type { NextApiHandler } from "next";

type Data = { status: "success" } | { status: "error"; message: string };

const handler: NextApiHandler<Data> = (req, res) => {
	if (req.method !== "POST") {
		res.setHeader("Allow", "POST");
		res.status(405).end("Method Not Allowed");
		return;
	}

	try {
		const { authorization } = req.headers;

		if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
			res.status(200).json({ status: "success" });
		} else {
			res.status(401).json({ status: "error", message: "Unauthorized" });
		}
	} catch (err) {
		const message = err instanceof Error ? err.message : "Unknown error";
		res.status(500).json({ status: "error", message });
	}
};
export default handler;
