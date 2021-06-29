import { Routes, Route } from "react-router-dom";
import { CompanyList, CompanyDetail, NotFoundPage } from "components";

export default function CompaniesPage() {
  return (
    <Routes>
      <Route path="/" element={<CompanyList />} />
      <Route path=":company" element={<CompanyDetail />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
