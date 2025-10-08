'use client'

import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PAGE_SIZE } from "../../../utils/constants";


const Pagination = ({ count }: { count: number }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }

    const pageCount = Math.ceil(count / PAGE_SIZE);

    const handleNextPage = () => {
        const calc = currentPage === pageCount ? currentPage : currentPage + 1;
        const next = createPageUrl(calc);
        router.push(next);
    }

    const handlePreviousPage = () => {
        const calc = currentPage === 1 ? currentPage : currentPage - 1;
        const previous = createPageUrl(calc);
        router.push(previous);
    }

    return (
        <div className="flex justify-between w-full p-2 border mt-2">
            <div className="flex">
                Showing {(currentPage - 1) * PAGE_SIZE + 1} - {currentPage === pageCount ? count : currentPage * PAGE_SIZE} of {count}
            </div>
            <div className="flex gap-2">
                <button disabled={currentPage === 1} onClick={handlePreviousPage} className="flex hover:text-white cursor-pointer disabled:cursor-not-allowed">
                    <ArrowLeft />
                    <span>Previous</span>
                </button>
                <button disabled={currentPage === pageCount} onClick={handleNextPage} className="flex hover:text-white cursor-pointer disabled:cursor-not-allowed">
                    <span>Next</span>
                    <ArrowRight />
                </button>
            </div>
        </div>
    )
}

export default Pagination;  