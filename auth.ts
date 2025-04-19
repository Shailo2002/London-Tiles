import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config"; // update path if needed

export const auth = () => getServerSession(authOptions);
