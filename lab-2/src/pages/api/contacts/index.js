import contactsRepo from "@/dao/contactsRepository";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const data = await contactsRepo.findAll();
        res.status(200).json(data);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
