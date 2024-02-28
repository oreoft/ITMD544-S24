export async function getServerSideProps(context) {
    return {
        redirect: {
            destination: 'https://oreoft.github.io/ITMD544-S24/lab-2',
            permanent: false,
        },
    };
}

export default function YourPage() {
    return <div>Redirecting...</div>;
}
