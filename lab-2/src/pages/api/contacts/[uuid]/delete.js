import contactsRepo from "@/dao/contactsRepository";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { uuid } = req.query;
        await contactsRepo.deleteById(uuid);
        res.status(200).json({ status: true, message: 'Contact deleted successfully' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
