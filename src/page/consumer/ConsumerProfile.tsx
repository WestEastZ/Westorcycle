import React from "react";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "@/components/header/PageHeader";
import { useUser } from "@/contexts/userContext";

export default function ConsumerProfile() {
  const user = useUser();
  return (
    <>
      <PageHeader
        title={`${user?.nickname}`}
        description={`구매자 전용 페이지`}
      />

      <div className="w-full h-px bg-slate-300 mb-8"></div>

      <div className="flex justify-center gap-24">
        <section>
          <Link
            to={`/cart/${user?.id}`}
            className="under-line text-custom text-3xl"
          >
            Cart
          </Link>
        </section>
        <section>
          <Link
            to={`/purchase/${user?.id}`}
            className="under-line text-custom text-3xl"
          >
            Purchase
          </Link>
        </section>
      </div>
    </>
  );
}
