import { Card, CardHeader, CardContent } from "../ui/card";

export function ApplicantDetailsCard() {
  const details = {
    firstName: "Juan",
    lastName: "Dela Cruz",
    middleName: "Santos",
    suffix: "Jr.",
    dob: "August 10, 1995",
    sex: "Male",
    nationality: "Filipino",
    phone: "+63 912 345 6789",
    email: "juan.delacruz@email.com",
    emergencyPhone: "+63 998 765 4321",
    emergencyContact: "Maria Dela Cruz",
    emergencyRelation: "Mother",
  };
  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader className="text-xl font-semibold">Personal Information</CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 text-sm">
          <div>
            <p className="text-muted-foreground">First Name</p>
            <p>{details.firstName}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Last Name</p>
            <p>{details.lastName}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Middle Name</p>
            <p>{details.middleName}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Suffix</p>
            <p>{details.suffix}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Date of Birth</p>
            <p>{details.dob}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Sex</p>
            <p>{details.sex}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Nationality</p>
            <p>{details.nationality}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Phone Number</p>
            <p>{details.phone}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Email</p>
            <p>{details.email}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Emergency Contact</p>
            <p>{details.emergencyContact}</p>
            <p className="text-muted-foreground text-xs mt-1">
              {details.emergencyRelation} · {details.emergencyPhone}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
