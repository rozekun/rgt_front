import ModifyView from "@/app/books/[id]/modify/(components)/ModifyView";

export default async function ModifyBookPage({params}:{params: Promise<{ id: string }>
}) {
    const {id} = await params  // ✅ await 안 해도 되는 구조

    return <ModifyView book_id={id}/>

}