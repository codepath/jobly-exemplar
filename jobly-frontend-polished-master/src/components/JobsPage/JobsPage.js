import { Routes, Route } from "react-router-dom";
import { JobList, NotFoundPage } from "components";

export default function JobsPage() {
  return (
    <Routes>
      <Route path="/" element={<JobList />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
