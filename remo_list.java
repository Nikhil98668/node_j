class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
       ListNode curr= head;
        int count=0;
        if(curr==null)
        return head.next;
        while(curr!=null)
        {
            count++;
            curr=curr.next;
        }
        if(n==count)
        {
            return head.next;
        }
        ListNode pre=head;
        for(int i=1;i<count-n;i++)
        {
            pre=pre.next;
        }
        pre.next=pre.next.next;
        return head; 
    }
}




public class Main
{
     public static void main(String[]args)
    {
        Scanner sc=new Scanner(System.in);
        int n =sc.nextInt();
        Solution s = new Solution();
        ListNode head =new ListNode(sc.nextInt());
        ListNode temp=head;
        for(int i=1;i<n;i++)
        {
            ListNode new_node=new ListNode(sc.nextInt());
            temp.next=new_node;
            temp=new_node;
        }
        int k=sc.nextInt();
        ListNode output = s.removeNthFromEnd(head,k);
        String str="";
        while(output!=null)
        {
            str=str+output.val+" ";
            output=output.next;
        }
        System.out.println(str);
    }
}
class ListNode
{
     int val;
     ListNode next;
     ListNode() {}
     ListNode(int val) 
     { 
         this.val = val; 
         next=null;
         
     }
}
