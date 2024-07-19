"use client"
import { Form } from "@/components/ui/form";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form';
import { useState , useEffect } from "react";
import axios from "axios"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from "@/components/ui/form";
import {Input} from "@/components/ui/input"

const styles = {
  h1: {
    textTransform: "uppercase",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  textInput: {
    width: "100%",
    padding: "8px 5px",
    fontSize: "1.2em",
  },
  saveButton: {
    padding: "10px 5px",
    width: "100%",
    margin: "5px 0 0 0",
    fontSize: "1.2em",
  },
  table: {
    width: "100%",
    margin: "30px 0 0 0",
  },
  tableHeader: {
    fontWeight: "bold",
  },
  tableShortUrlCell: {
    padding: "5px 20px 5px 0",
    width: "50%",
    cursor: "pointer",
  },
};

export default function Home() {
  let [links, setLinks] = useState({});
  const form = useForm();
  const handleShorten = async(data)=>{
    // console.log("Abc")
    try{
      console.log(data.url);
      const response = await axios.post("/api/shorten" , {longUrl : data.url});
      console.log(response);
      await refreshLinks();
    }
    catch(error){
      console.log(error);
    }
  }

  const getLinks = async () => {
    const response = await axios.get("/api/links");
    return response?.data?.links;
  };

  const refreshLinks = async () => {
    let linkObjects = await getLinks();
    setLinks(linkObjects);
  };

  const onShortUrlClick = (shortUrl) => {
    const url = `http://localhost:3000/go/${shortUrl}`;
    navigator.clipboard.writeText(url).then(
      () => {
        /* Resolved - text copied to clipboard */
        console.log("Copied link to the clipboard");
      },
      () => {
        /* Rejected - clipboard failed */
        alert("Could not copy the link to clipboard.");
      }
    );
  };
  
  useEffect(() => {
    (async () => {
      await refreshLinks();
    })();
  },[]);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get your URL shortened&nbsp;
          <code className="font-mono font-bold"></code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div>
      <Form {...form}  >
        <form className="form flex flex-row justify-center items-center" onSubmit={form.handleSubmit(handleShorten)} >
        <FormField
          control={form.control}
          name="url"
          render={({field}) => (
            <FormItem>
              <FormLabel >URL Shortner</FormLabel>
              <FormControl>
                <Input placeholder='Enter URL' {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-center items-center text-white m-2 mt-7 "><Button type="submit">Proceed</Button></div>
        </form>
      </Form>
      </div>

      <div>
        <table style={styles.table}>
          <thead>
            <tr>
              <td style={styles.tableHeader}>Short url</td>
              <td style={styles.tableHeader}>Original url</td>
            </tr>
          </thead>
          <tbody>
            {Object.keys(links).map((short) => {
              // links is form of { shortUrl: longUrl }, so the short url is key
              const long = links[short];
              return (
                <tr key={short}>
                  <td
                    style={styles.tableShortUrlCell}
                    onClick={() => onShortUrlClick(short)}
                  >{`http://localhost:3000/go/${short}`}</td>
                  <td>{long}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
