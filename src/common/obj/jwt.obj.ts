import { ApiProperty } from '@nestjs/swagger';

export class JwtToken {
	@ApiProperty({
		example:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWY1ZWY1NjgyNDZiNTE0MTVmN2UwZSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY4OTIxNDcyNiwiZXhwIjoxNzIwNzcyMzI2fQ.RnOYP8fyG-dpQRYvjKJkOwfjix_s-GGPl_EePuvfGJs',
	})
	token: string;

	@ApiProperty({})
	role: string;
}
