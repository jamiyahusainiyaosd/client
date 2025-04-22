import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import noticeService from "../services/notice.services";
import Loader from "../../../components/Loader";
import Error from "../../../components/Error";
import NoDataFound from "../../../components/NoDataFound";
import Notice from "./Notice";

const Notices = () => {
  const { isPending, data, isError } = useQuery({
    queryKey: ["notices"],
    queryFn: noticeService.getAll,
  });
  const refinedData = useMemo(() => data?.data ?? [], [data]);
  return (
    <>
      {isPending && <Loader />}
      {!isPending && isError && <Error />}
      {!isPending && refinedData.length === 0 ? (
        <NoDataFound />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {refinedData.map(({ title, created_at, id }) => (
            <Notice created_at={created_at} id={id} title={title} key={id} />
          ))}
        </div>
      )}
    </>
  );
};

export default Notices;