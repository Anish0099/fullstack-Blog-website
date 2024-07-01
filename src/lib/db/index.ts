import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

neonConfig.fetchConnectionCache = true;



const sql = neon('postgresql://neondb_owner:c4iUjAabnR8y@ep-withered-bush-a1q5x3i0.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

export const db = drizzle(sql);