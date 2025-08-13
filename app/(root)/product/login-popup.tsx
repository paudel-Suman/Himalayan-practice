"us eclient";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "@/app/(auth)/login/login-form";
import { createPortal } from "react-dom";

const LoginPoupup = ({ onClose }: { onClose: () => void }) => {
  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-[50] flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-zinc-50  rounded-lg md:p-6 p-4 w-[90%] max-w-md shadow-lg text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight ">
                Welcome back
              </h1>
              <p className="mt-2 text-sm text-gray-900">
                Please sign in to your account
              </p>
            </div>

            <LoginForm />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
     document.body 
  );
};

export default LoginPoupup;
