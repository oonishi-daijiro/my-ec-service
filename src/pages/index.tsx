import React from "react";
import { Product, defaultProduct } from "../product";
import { useRouter } from "next/router";
import { read } from "fs";


const ctxProducts = React.createContext<Product[]>([defaultProduct]);

export default function Index() {
  return <><Order></Order></>;
}

const Order: React.FC = () => {
  return <button onClick={
    () => {
      const orderPromise = fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: "changed name" })
      })
      orderPromise.then(async e => {
        const res = await (await fetch('/api/get-all-products', {
          method: 'GET',
        })).json();
        console.log(res);



      })
    }} >order</button>
}

const Header: React.FC = () => {
  return (
    <div id="header">
      <Logo />
      <Search />
      <WebSiteDescription />
    </div>
  );
}

const Result: React.FC = () => {
  return <></>
}

const ProductThumbnail: React.FC<Product> = (props) => {
  return <>
    <p>{props.name}</p>
    <p>{props.description}</p>
    <p>{props.price}</p>
    <p>{props.stock}</p>
    <p>{props.id}</p>
  </>
}

const WebSiteDescription: React.FC = () => {
  return (
    <div suppressHydrationWarning={true} id="websiteDescription">※このサイトは授業の課題で作成したサイトです．サイト内の商品は一切購入することができません．</div>
  )
};

const Logo: React.FC = () => {
  return <img src="/logo.svg" id="logo"></img>
}

const Search: React.FC = () => {
  const [textInput, editableTextInput] = useEditableTextInput({ value: "" });
  const router = useRouter();

  return <form onSubmit={e => {
    e.preventDefault()
    router.push(`/search/${textInput}`);
  }
  }><>{editableTextInput}</></form>;
}


function useEditableTextInput(props: React.ComponentProps<'input'> = {}): [React.ComponentProps<'input'>['value'], React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>] {
  const [textInput, setTextInput] = React.useState(props.value ?? "");
  return [textInput, <input {...props} value={textInput ?? ""} onChange={e => { setTextInput(e.target.value); (props.onChange ?? ((e) => { }))(e) }} />];
}
