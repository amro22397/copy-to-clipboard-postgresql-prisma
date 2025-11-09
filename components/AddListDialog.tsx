'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
//   DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const AddListDialog = ({
  email, userId, getLists
}: {
  email: string;
  userId: string;
  getLists: () => void
}) => {

    const [listDialogOpen, setListDialogOpen] = useState(false);

    const [addListLoading, setAddListLoading] = useState(false);

    const [listName, setListName] = useState("New List");


    const handleAddList = async (e: any) => {
      
      e.preventDefault();

      
      setAddListLoading(true)

      if (listName.length > 0) {

        try {
          
          const res = await axios.post("/api/list", {
            name: listName,
            email: email,
            userId: userId
          })

          console.log(res);

          if (!res.data.success) {
            toast.error(res.data.message)
            setListDialogOpen(false)
          }

          if (res.data.success) {
            toast.success(res.data.message)
            getLists();
            setListDialogOpen(false)
          }

          setAddListLoading(false)

        } catch (error) {
          
          console.log(`Client error adding list: ${error}`)

          toast.error(`Client error adding list: ${error}`)

          setAddListLoading(false)
          setListDialogOpen(false)

        }
      } else {
        toast.error("Please enter a list name");
        setAddListLoading(false)
      }


    }

  return (
    <Dialog open={listDialogOpen} 
    onOpenChange={() => {
      setListDialogOpen(!listDialogOpen);
      setListName("New List");
    }}
    >
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-yellow-600 text-white hover:text-white shadow-lg
          text-[17.5px] tracking-wider py-[18px] hover:bg-yellow-600/95 active:scale-95 cursor-pointer"
          // border border-black
          onClick={() => setListDialogOpen(true)}
          >
            Add List
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add List</DialogTitle>


            {/* <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription> */}


          </DialogHeader>


          <div className="flex flex-col my-[5px] gap-4">
            <div className="grid gap-3">
              <Label htmlFor="list-name-1">List name</Label>
              <Input id="list-name-1" name="list-name-1" defaultValue="New List" className="px-2"
              onChange={(e: any) => setListName(e.target.value)}
              />
            </div>
            {/* <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div> */}
          </div>
          <DialogFooter>

            <DialogClose asChild>

              <Button variant="outline"
              onClick={() => setListDialogOpen(false)}
              >Cancel</Button>


            </DialogClose>

            
            <Button
            onClick={handleAddList}
            >
              {addListLoading ? <Loader2 className="animate-spin" /> : "Save"}
            </Button>

          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default AddListDialog