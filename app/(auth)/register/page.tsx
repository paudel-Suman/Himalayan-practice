import React from "react";
import RegisterForm from "./register-form";
import Image from "next/image";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <main className="max-w-7xl md:mx-auto mx-2">
      <section className="grid md:grid-cols-2">
        <div>
          <figure className="md:block hidden">
            <Image
              src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="login-dummy-img"
              width={1000}
              height={1000}
              className="h-screen object-cover"
            />
          </figure>
        </div>
        <div className="flex items-center justify-center bg-gray-50  py-12 ">
          <div className="w-full max-w-md space-y-8">
            <Link href="/">
              <Image
                src="/logo/mainlogo.png"
                alt="logo"
                width={1000}
                height={1000}
                className="object-contain w-40 mx-auto mb-4"
              />
            </Link>
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Create your account
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Join us today and get started
              </p>
            </div>
            <RegisterForm />
          </div>
        </div>
        <div></div>
      </section>
    </main>
  );
};

export default RegisterPage;
