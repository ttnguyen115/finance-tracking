// components
import Header from "@/components/Header";

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <>
            <Header />
            <main className="px-3 lg:px-14">{children}</main>
        </>
    );
};

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default DashboardLayout;
